<template>
  <div class="tabs__container">
		<nav class="tabs__navigation">
			<ul class="tabs__navigation__list">
				<li v-for="(tab, index) in tabs" :class="{'is-active': tab.isActive}">
					<a :href="tab.href" @click="selectTab(tab, $event)">{{ tab.name }}</a>
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
  		tabs: []
  	}
  },
  created () {
  	this.tabs = this.$children;
  },
  methods : {
  	selectTab (selectedTab) {
  		this.$emit('selectTab');
  		this.tabs.forEach(tab => {
  			tab.isActive = (tab.href == selectedTab.href);
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
