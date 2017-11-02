import Tabs from './Tabs.vue';
import Tab from './Tab.vue';

const Plugin = {
	install (Vue, options = {}) {
		if (this.installed) {
			return;
		}

		this.installed = true;

		Vue.prototype.$tabs = {
			bus: new Vue(),
			open (name, tabIndex) {
				this.bus.$emit('open', name, tabIndex);
			},
			switchType (name, type) {
				this.bus.$emit('switchType', name, type);
			}
		}

		Vue.component('Tabs', Tabs);
		Vue.component('Tab', Tab);
	}
}

export default Plugin;