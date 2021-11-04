<template>
  <div>
    <div>
      <button @click="insertText">insert text</button>
    </div>
    <div style="border: 1px solid #ccc;">
      <!-- 工具栏 -->
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editorId="editorId"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />

      <!-- 编辑器 -->
      <Editor
          style="height: 500px"

          :editorId="editorId"

          :defaultConfig="editorConfig"
          :defaultContent="getDefaultContent"
          :mode="mode"

          @onCreated="onCreated"
          @onChange="onChange"
          @onDestroyed="onDestroyed"
          @onMaxLength="onMaxLength"
          @onFocus="onFocus"
          @onBlur="onBlur"
          @customPaste="customPaste"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      //【特别注意】
      // 1. editorId Toolbar 和 Editor 的关联，要保持一致
      // 2. 多个编辑器时，每个的 editorId 要唯一
      editorId: 'w-e-1',

      toolbarConfig: { /* 工具栏配置 */ },
      defaultContent: [
        {
          type: 'paragraph',
          children: [{ text: '一行文字' }],
        },
      ],
      editorConfig: {
        placeholder: '请输入内容...',
        // 其他编辑器配置
        // 菜单配置
      },
      mode: 'default', // or 'simple'
      curContent: []
    }
  },

  computed: {
    // 注意，深度拷贝 content ，否则会报错
    getDefaultContent() {
      return cloneDeep(this.defaultContent)
    }
  },

  methods: {
    onCreated(editor) {
      console.log('onCreated', editor)
    },
    onChange(editor) {
      console.log('onChange', editor.children)
      this.curContent = editor.children
    },
    onDestroyed(editor) {
      console.log('onDestroyed', editor)
    },
    onMaxLength(editor) {
      console.log('onMaxLength', editor)
    },
    onFocus(editor) {
      console.log('onFocus', editor)
    },
    onBlur(editor) {
      console.log('onBlur', editor)
    },
    customPaste(editor, event, callback) {
      console.log('ClipboardEvent 粘贴事件对象', event)

      // 自定义插入内容
      // editor.insertText('xxx')

      // 返回值（注意，vue 事件的返回值，不能用 return）
     // callback(false) // 返回 false ，阻止默认粘贴行为
       callback(true) // 返回 true ，继续默认的粘贴行为
    },

    insertText() {
      // 获取 editor 实例，即可执行 editor API
      const editor = getEditor(this.editorId)
      if (editor == null) return
      if (editor.selection == null) return

      // 在选区插入一段文字
      editor.insertText('一段文字')
    },
  },

  // 及时销毁 editor
  beforeDestroy() {
    const editor = getEditor(this.editorId)
    if (editor == null) return

    // 销毁，并移除 editor
    editor.destroy()
    removeEditor(this.editorId)
  }
})
</script>

<style scoped>
.top-container {
  border-bottom: 1px solid #e8e8e8;
  padding-left: 30px;
}

.editor-toolbar {
  width: 1300px;
  background-color: #FCFCFC;
  margin: 0 auto;
}

.content {
  height: calc(100% - 40px);
  background-color: rgb(245, 245, 245);
  overflow-y: auto;
  position: relative;
}

.editor-container {
  width: 850px;
  margin: 30px auto 150px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

.title-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

.title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}

.editor-text-area {
  min-height: 900px;
  margin-top: 20px;
  height: 400px;
}
</style>