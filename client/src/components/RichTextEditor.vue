<template>
    <div>
        <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { ref, reactive, inject, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { UserStore } from "../store/UserStore";

const server_url=inject("server_url")
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };
editorConfig.MENU_CONF={excludeKeys:["uploadVideo"] }//不显示上传视频的按钮
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 10 * 1024, //  用于设置上传的图片的 base64 编码的大小限制，这里设置为 10 * 1024，即 10KB。
     server: server_url+'/upload/rich_editor_upload',
}//上传图片的配置
editorConfig.MENU_CONF['insertImage'] ={
    parseImageSrc:(src) =>{
        if(src.indexOf("http") !==0){
            return `${server_url}${src}`
        }
        return src
    }
}//插入图片时判断如果是本地文件就加上server_url
const mode=ref("default")

const valueHtml = ref('');  

const props = defineProps({
    modelValue:{
        type:String,
        default:""
    }
})
const emit = defineEmits([ 'update:model-value'])


let initFinished = false

onMounted(() => {
    setTimeout(() => {
        valueHtml.value = props.modelValue;
        initFinished = true;
    }, 200);
});//组件挂载时，设置valueHtml的值为props.modelValue

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.destroy();
    });

    // 编辑器回调函数
    const handleCreated = (editor) => {
      console.log('created', editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor) => {
      /* console.log('change:', editor.getHtml()); */
      if (initFinished) {
        emit("update:model-value", valueHtml.value)//initFinished为true时，才能触发update:modelValue事件
    }//
    };//编辑器内容改变时触发update:modelValue(这是一个自定义事件的全称)
</script>

<style lang="scss" scoped>

</style>