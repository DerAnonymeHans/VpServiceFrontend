<!-- @format -->
<script setup>
import Header from "./Header.vue";
import Main from "./Main.vue";
import Footer from "../../components/footer/Footer.vue";
</script>

<template>
	<Header />
	<Main />
</template>

<script>
export default {
	component: {
		Header, Main
	}
}
</script>


<style scoped lang="scss">
</style>
