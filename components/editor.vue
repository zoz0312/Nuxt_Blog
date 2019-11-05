<template>
	<div>
	<editor
		api-key="w86qig4br7nlyws275baqoihhssh6gb8xd6zpmurmmuby0b8"
		initialValue=""
		:init="{
			width: '100%',
			height: 500,
			menubar: 'file edit view insert format tools table tc help',
			plugins: [
				'hr advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table paste code help wordcount'
			],
			toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | emoticons | fullscreen  preview | insertfile image pageembed template link | a11ycheck ltr rtl | showcomments addcomment',
			content_css: [
				'//fonts.googleapis.com/earlyaccess/nanumgothic.css',
				'//fonts.googleapis.com/earlyaccess/nanumgothiccoding.css',
				'//fonts.googleapis.com/earlyaccess/nanummyeongjo.css',
				'//fonts.googleapis.com/earlyaccess/nanumbrushscript.css',
				'//fonts.googleapis.com/earlyaccess/nanumpenscript.css',
				'//cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css'
			],
			content_style: '.mce-content-body {font-size:15px;font-family:Nanum Gothic;}',
			font_formats: '나눔고딕=Nanum Gothic;나눔바른고딕=Nanum Barun Gothic;나눔고딕코딩=Nanum Gothic Coding;나눔명조=Nanum Myeongjo;나눔손글씨 붓체=Nanum Brush Script;나눔손글씨 펜체=Nanum Pen Script;',
			fontName: 'Nanum Gothic'
		}"
		v-model="editor_val"
	></editor>
	</div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
	data () {
		return {
			editor_val: ''
		}
	},
	components: {
		'editor': Editor
	},
	methods: {
		return_value () {
			return this.editor_val;
		},
		intert_value (val) {
			this.editor_val = val;
		}
	}
}
</script>
