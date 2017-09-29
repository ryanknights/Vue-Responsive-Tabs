<template>
  <div id="app">
    <h1>Tabs 1</h1>
    <p>
      <strong>Component Event:</strong><br />
      Tabs 1 selected index is {{ tabs1ComponentSelectedIndex }}
    </p>
    <p>
      <strong>$tabs EventBus</strong><br />
      Tabs 1 selected index is {{ tabs1EventBusSelectedIndex }}
    </p>
    <p>
      <strong>Breakpoint(px)</strong>
      <input type="number" v-model="breakpoint">
      {{ breakpoint }}
    </p>
    <button @click="switchTab('tabs1', 0)">Open Tab 1</button>
    <button @click="switchTab('tabs1', 1)">Open Tab 2</button>
    <button @click="switchTab('tabs1', 2)">Open Tab 3</button>
    <tabs name="tabs1" @beforeChange="componentBeforeChange" @afterChange="componentAfterChange" @typeChange="componentTypeChange" :breakpoint=breakpoint>
      <tab name="Tab 1" :selected="true">
        <h1>Tab 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate ducimus culpa asperiores nihil quia atque cumque enim ea fugit error, qui consectetur eligendi nam ipsa ipsum voluptatibus voluptates magni sequi?</p>
      </tab>
      <tab name="Tab 2">
        <h1>Tab 2</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate ducimus culpa asperiores nihil quia atque cumque enim ea fugit error, qui consectetur eligendi nam ipsa ipsum voluptatibus voluptates magni sequi?</p>
      </tab> 
      <tab name="Tab 3">
        <h1>Tab 3</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate ducimus culpa asperiores nihil quia atque cumque enim ea fugit error, qui consectetur eligendi nam ipsa ipsum voluptatibus voluptates magni sequi?</p>
      </tab>           
    </tabs>
    <hr />
    <h1>Tabs 2</h1>
    <p>
      <strong>Component Event:</strong><br />
      Tabs 2 selected index is {{ tabs2ComponentSelectedIndex }}
    </p>   
    <p>
      <strong>$tabs EventBus</strong><br />
      Tabs 2 selected index is {{ tabs2EventBusSelectedIndex }}
    </p>     
    <button @click="switchTab('tabs2', 0)">Open Tab 1</button>
    <button @click="switchTab('tabs2', 1)">Open Tab 2</button>
    <button @click="switchTab('tabs2', 2)">Open Tab 3</button>
    <br />
    <button @click="switchType('tabs2', 'tabs')">Tabs</button>
    <button @click="switchType('tabs2', 'accordion')">Accordion</button>    
    <tabs name="tabs2" @beforeChange="componentBeforeChange" @afterChange="componentAfterChange" @typeChange="componentTypeChange" type="accordion" :responsive=false >    
      <tab name="Tab 1" :selected="true">
        <h1>Tab 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate ducimus culpa asperiores nihil quia atque cumque enim ea fugit error, qui consectetur eligendi nam ipsa ipsum voluptatibus voluptates magni sequi?</p>
      </tab>
      <tab name="Tab 2">
        <h1>Tab 2</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate ducimus culpa asperiores nihil quia atque cumque enim ea fugit error, qui consectetur eligendi nam ipsa ipsum voluptatibus voluptates magni sequi?</p>
      </tab> 
      <tab name="Tab 3">
        <h1>Tab 3</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate ducimus culpa asperiores nihil quia atque cumque enim ea fugit error, qui consectetur eligendi nam ipsa ipsum voluptatibus voluptates magni sequi?</p>
      </tab>           
    </tabs>    
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      tabs1ComponentSelectedIndex: 0,
      tabs2ComponentSelectedIndex: 0,
      tabs1EventBusSelectedIndex: 0,
      tabs2EventBusSelectedIndex: 0,
      breakpoint: 768
    }
  },
  mounted () {
    this.$tabs.bus.$on('beforeChange', (component, newTab, newTabIndex) => {

    });

    this.$tabs.bus.$on('afterChange', (component, newTab, newTabIndex) => {
      this[`${component.name}EventBusSelectedIndex`] = newTabIndex;
    });
  },
  methods: {
    switchTab (name, index) {
      this.$tabs.open(name, index);
    },
    switchType (name, type) {
      this.$tabs.switchType(name, type);
    },
    componentBeforeChange (component, newTab, newTabIndex) {
      
    },
    componentAfterChange (component, newTab, newTabIndex) {
      this[`${component.name}ComponentSelectedIndex`] = newTabIndex;
    },
    componentTypeChange (component, oldType, newType) {
      console.log(`${component.name} switched from ${oldType} to ${newType}`);
    }
  }
}
</script>

<style>

</style>
