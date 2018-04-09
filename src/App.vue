<style lang="less" scoped>
#app {
	width: 100%;
	height: 100%;
	>div {
		width: 100%;
		height: 100%;
	}
}

.jumpIn-enter-active {
	transition: all .3s linear;
}

.jumpIn-leave-active {
	transition: all .3s linear;
}

.jumpIn-enter {
	transform: translateX(300px);
}

.jumpIn-leave-to {
	transform: translateX(-300px);
}

.jumpOut-enter-active {
	transition: all .3s linear;
}

.jumpOut-leave-active {
	transition: all .3s linear;
}

.jumpOut-enter {
	transform: translateX(-300px);
}

.jumpOut-leave-to {
	transform: translateX(300px);
}
</style>

<template>
	<div id="app">
		<transition :name="$store.state.transitionType" :mode="$store.state.transitionMoel">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive" />
			</keep-alive>
		</transition>
		<transition :name="$store.state.transitionType" :mode="$store.state.transitionMoel">
			<router-view v-if="!$route.meta.keepAlive" />
		</transition>

	</div>
</template>

<script>
// import ajpush from ('ajpush')
export default {
	data() {
		return {
		}
	},
	created() {

	},
	mounted: function() {
	},
	components: {
	}
}
</script>
