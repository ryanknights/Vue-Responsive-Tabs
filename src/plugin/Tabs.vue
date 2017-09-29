<template>
  <div class="tabs__container">
		<nav class="tabs__navigation">
			<ul class="tabs__navigation__list">
				<li v-for="(tab, index) in tabs" :class="{'is-active': tab.isActive}" :index="index">
					<a @click="onSelect(index, $event)">{{ tab.name }}</a>
				</li>
			</ul>
		</nav>
		<div class="tabs__content">
			<slot />
		</div>
  </div>
</template>

<script>

export default {
  name: 'tabs',
  props: {
  	name: { default: false }
  },
  data () {
  	return {
  		tabs: [],
  		activeTab: false
  	}
  },
  created () {
  	this.tabs = this.$children;
  },
  mounted () { 
  	this.tabs.forEach((tab, index) => tab.index = index);

  	this.$tabs.bus.$on('open', (componentName, index) => {
  		if (this.name !== componentName) {
  			return;
  		}

  		this.onSelect(index);
  	});
  },
  methods : {
  	onSelect (selectedIndex) {
  		if (this.tabs[selectedIndex] === 'undefined') {
  			return;
  		}

  		const selectedTab = this.tabs[selectedIndex];

  		if (selectedTab.isActive) {
  			return;
  		}

  		this.emitBeforeChange(selectedTab, selectedIndex);
  		this.changeToTab(selectedTab);
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
  	changeToTab(toTab) {
  		this.tabs.forEach(tab => {
  			tab.isActive = (tab.href == toTab.href);
  		});  		
  	}
  }
}
</script>

<style>
	.tabs__container {

	}

	.tabs__navigation {

	}

	.tabs__navigation__list {
		list-style : none;
		padding : 0;
	}

	.tabs__navigation__list li {
		float : left;
	}

	.tabs__navigation__list li.is-active a {
		font-size : 20px;
	}	

	.tabs__navigation__list li a {
		display : block;
		padding : 8px;
		border  : 1px solid #ccc;
	}

	.tabs__content {
		clear : both;
	}

	@media only screen and (max-width: 768px) {
		.tabs__navigation {
			display : none;
		}		
	}
</style>
