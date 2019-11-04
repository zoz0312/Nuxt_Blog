<template>
	<editor
		api-key="w86qig4br7nlyws275baqoihhssh6gb8xd6zpmurmmuby0b8"
		initialValue="<p>This is the initial content of the editor</p>"
		:init="{
			width: '100%',
			height: 500,
			menubar: 'file edit view insert format tools table tc help',
			plugins: [
				'hr advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table paste code help wordcount'
			],
			toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | emoticons | fullscreen  preview | insertfile image pageembed template link | a11ycheck ltr rtl | showcomments addcomment'
		}"
	></editor>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
	components: {
		'editor': Editor
	}
}
</script>
