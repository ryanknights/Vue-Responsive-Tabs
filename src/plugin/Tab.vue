<template>
  <div :class="['rs-tabs__tab', {'is-active': isActive}]">
  	<a
  		class="rs-tabs__tab__accordion-title" 
      @click="selectAccordion($event)" 
  	>
      <span 
        :class="['rs-tabs__navigation__icon', `rs-tabs__navigation__icon--${icon}`]"
        v-show="icon"
      ></span>
  		{{ name }}
  	</a>
  	<div class="rs-tabs__tab__content" v-show="isActive">
  		<slot />
  	</div>
  </div>
</template>

<script>

export default {
  name: 'tab',
  props: {
  	name: { required: true },
  	selected: { default: false },
    icon: { default: false }
  },
  data () {
  	return {
  		isActive: false
  	}
  },
  computed: {
  	href () {
  		return `#${this.name.toLowerCase().replace(/ /g, '_')}`;
  	}
  },
  mounted () {
  	this.isActive = this.selected;
  },
  methods: {
  	selectAccordion ($event) {
  		this.$parent.onSelect(this.index, $event);
  	}
  }
}
</script>

<style lang="less">

	.rs-tabs__tab__content {
    padding : 20px;
    border  : 1px solid #ddd;
    //border-top : 0;
    border-radius : 3px;
	}

	.rs-tabs__tab__accordion-title.is-active {
		font-size : 20px;
	}
  
</style>
