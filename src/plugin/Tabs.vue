<template>
  <div class="rs-tabs__container" :class="typeClass">
		<nav class="rs-tabs__navigation">
			<ul class="rs-tabs__navigation__list">
				<li 
          v-for="(tab, index) in tabs" 
          :class="['rs-tabs__navigation__item', {'is-active': tab.isActive}]" 
          :index="index"
        >
					<a 
            @click="onSelect(index, $event)"
            class="rs-tabs__navigation__link"
          >
						<span 
              :class="['rs-tabs__navigation__icon', `rs-tabs__navigation__icon--${tab.icon}`]" 
              v-show="tab.icon"
            ></span>
						{{ tab.name }}
					</a>
				</li>
			</ul>
		</nav>
		<div class="rs-tabs__content">
			<slot />
		</div>
  </div>
</template>

<script>

import throttle from 'lodash.throttle'

export default {
  name: 'tabs',
  props: {
  	name: { default: false },
  	responsive: { default: true, type: Boolean },
  	type: { default: 'tabs', type: String},
  	breakpoint: { default: 768, type: [String, Number] },
  	collapsible: { default: false },
  	keepOpen: { default: false }
  },
  data () {
  	return {
  		tabs: [],
  		currentType: this.type,
  	}
  },
  computed: {
  	typeClass () {
  		return `rs-tabs__container--${this.currentType}`;
  	},
  	isResponsive () {
  		return !!this.responsive;
  	}
  },
  watch: {
  	breakpoint (newValue, oldValue) {
  		this.checkType();
  	}
  },
  created () {
  	this.tabs = this.$children;
  },
  mounted () { 
  	if (this.isResponsive) {
  		this.currentType = this.findType(); 

  		this.resizeListener = throttle(this.checkType.bind(this), 200);
  		window.addEventListener('resize', this.resizeListener);
  	}
  	 	
  	this.updateTabIndexes();
  	this.$tabs.bus.$on('open', this.onApiOpen);
  	this.$tabs.bus.$on('switchType', this.onApiSwitchType);
  },
  beforeDestroy () {
  	if (this.isResponsive) {
  		window.removeEventListener('resize', this.resizeListener);
  	}
  },
  methods : {
  	onSelect (selectedIndex) {
  		if (this.tabs[selectedIndex] === 'undefined') {
  			return;
  		}

  		const selectedTab = this.tabs[selectedIndex];

  		if (
        (this.currentType === 'tabs' && selectedTab.isActive) || 
        (this.currentType === 'accordion' && selectedTab.isActive && !this.collapsible)
      ) {
  			return;
  		}

  		this.emitBeforeChange(selectedTab, selectedIndex);
  		this.change(selectedTab);
  		this.emitAfterChange(selectedTab, selectedIndex);
  	},
  	emitBeforeChange (tab, index) {
  		this.$emit('beforeChange', this, tab, index);
  		this.$tabs.bus.$emit('beforeChange', this, tab, index);
  	},
  	emitAfterChange (tab, index) {
  		this.$emit('afterChange', this, tab, index);
  		this.$tabs.bus.$emit('afterChange', this, tab, index);
  	},
  	emitTypeChange (typeFrom, typeTo) {
  		this.$emit('typeChange', this, typeFrom, typeTo);
  		this.$tabs.bus.$emit('typeChange', this, typeFrom, typeTo);
  	},
  	change (toTab) {
  		if (this.currentType === 'tabs') {
	  		this.tabs.forEach(tab => {
	  			tab.isActive = (tab.href == toTab.href);
	  		});  
  		} else if (this.currentType === 'accordion') {
  			if (toTab.isActive && this.collapsible) {
  				toTab.isActive = false;
  			} else if (this.keepOpen) {
  				toTab.isActive = true;
  			} else {
		  		this.tabs.forEach(tab => {
		  			tab.isActive = (tab.href == toTab.href);
		  		});   				
  			}
  		}		
  	},
  	checkType () {
  		const oldType = this.currentType,
  			    newType = this.findType();

  		if (oldType === newType) {
  			return;
  		}

  		this.typeChanged(oldType, newType);
  	},
  	typeChanged (oldType, newType) {
  		this.currentType = newType;

  		switch (newType) {
  			/*----------  Accordion to Tabs  ----------*/
  			case 'tabs':
  				// User closed all accordion panels then switched to tabs, need to reopen something if this occurs?!
  				if (this.tabs.every(tab => !tab.isActive)) { 
  					this.onSelect(0);
  				}

  				// User has keep open on and has multiple panels open, now switches back to tabs. Reopen first tab.
  				if (this.tabs.filter(tab => tab.isActive).length > 1) {
  					this.change(this.tabs[0]);
  				}
  			break;

  			/*----------  Tabs to Accordion  ----------*/
  			case 'accordion':

  			break;

  			default: 
  			break;
  		}
  		
  		this.emitTypeChange(oldType, newType);
  	},
  	findType () {
  		return (window.innerWidth > parseInt(this.breakpoint))? 'tabs' : 'accordion';
  	},
  	updateTabIndexes () {
  		this.tabs.forEach((tab, index) => tab.index = index);
  	},
  	onApiOpen (componentName, index) {
  		if (this.name !== componentName) {
  			return;
  		}

  		this.onSelect(index);  		
  	},
  	onApiSwitchType (componentName, newType) {
  		if (this.name !== componentName || this.currentType === newType) {
  			return;
  		}

  		this.typeChanged(this.type, newType);
  	}
  }
}
</script>

<style lang="less">
	.rs-tabs__container {
		&--tabs {
			.rs-tabs__tab__accordion-title {
				display : none;
			}
		}

		&--accordion {
			.rs-tabs__navigation {
				display : none;
			}
		}
	}

	.rs-tabs__navigation {
    
	}

	.rs-tabs__navigation__list {
		list-style : none;
		padding    : 0;
    margin : 0;

    &:after {
      content : '';
      clear : both;
      display : table;
    }
  }

  .rs-tabs__navigation__item {
    float : left;

    &.is-active {
      .rs-tabs__navigation__link {
        border : 1px solid #ddd;
        border-bottom-color : transparent;
        background : #fff;        
      }
    }
  }

  .rs-tabs__navigation__link {
      display : block;
      padding : 10px 20px;
      margin-bottom : -1px;
      font-size : 18px;
      border-radius: 3px 3px 0 0;
      border : 1px solid transparent;    
  }

	.rs-tabs__navigation__icon {
    width      : 10px;
    height     : 10px;
    display    : inline-block;
    background : blue;
	}

	.rs-tabs__content {
		clear : both;
	}

</style>
