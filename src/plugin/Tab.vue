<template>
  <div class="tabs__tab" :class="{'is-active': isActive}">
  	<a
  		class="tabs__tab__accordion-title" 
      @click="selectAccordion($event)" 
  	>
  		{{ name }}
  	</a>
  	<div class="tabs__tab__content" v-show="isActive">
  		<slot />
  	</div>
  </div>
</template>

<script>

export default {
  name: 'tab',
  props: {
  	name: { required: true },
  	selected: { default: false }
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

	.tabs__tab__content {
		padding : 20px;
		border: 1px solid #ccc;
	}

	.tabs__tab__accordion-title.is-active {
		font-size : 20px;
	}
  
</style>
