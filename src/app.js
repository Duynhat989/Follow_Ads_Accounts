import './assets/css/global.min.css'
chrome.runtime.getPackageDirectoryEntry(function (root) {
    var reader = root.createReader();
    var readEntries = function () {
        reader.readEntries(function (entries) {
            if (entries.length) {
                // Xử lý từng tệp và thư mục
                entries.forEach(function (entry) {
                    if (entry.name.includes('.css')) {
                        var link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = entry.name;
                        document.head.appendChild(link);
                    }
                    if (entry.isDirectory) {
                        readEntries(entry.createReader());
                    }
                });
                readEntries();
            }
        });
    };
    readEntries();
});
import { createApp } from 'vue'
// import Antd from 'ant-design-vue';
import App from './components/App.vue'
// import '../node_modules/ant-design-vue/dist/antd.css';
const app = createApp(App)
// .use(Antd)
app.mount('#app')
