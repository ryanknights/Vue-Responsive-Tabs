import Tabs from './Tabs';
import Tab from './Tab';

const Plugin = {
	install (Vue, options = {}) {
		if (this.installed) {
			return;
		}

		this.installed = true;

		Vue.prototype.$tabs = {
			bus: new Vue(),
			open (name, params) {
				this.bus.$emit('open', name, params);
			}
		}

		Vue.component('Tabs', Tabs);
		Vue.component('Tab', Tab);
	}
}

export default Plugin;