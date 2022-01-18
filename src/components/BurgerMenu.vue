<template>
	<Modal
		title="Menu"
		:visible="visible"
		class="burger-menu"
		@close="$emit('close')"
	>
		<div class="bm__menu">
			<Link to="/" label="Découvrir" />
			<Link to="/about/" label="Le concept" />
		</div>
		<GrowerIntro />
		<Button to="/new/" icon="plus" label="Ajouter mon activité" />
	</Modal>
</template>

<script>
import GrowerIntro from './GrowerIntro';

export default {
	props: {
		visible: Boolean
	},

	components: {
		GrowerIntro
	}
}
</script>

<style lang="scss" scoped>
.bm__menu {
	display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid color(grey-lighter);

	> .link {
		font-size: 25px;
		margin-left: -#{space(3)};
	}
}
</style>