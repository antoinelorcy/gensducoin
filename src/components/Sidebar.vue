<script>
import Intro from './Intro';
import GrowerIntro from './GrowerIntro';

export default {
	components: {
		Intro,
		GrowerIntro
	},

	props: {
		showIntro: Boolean,
		showAddPerson: Boolean,
		customImage: String
	}
}
</script>

<template>
	<section class="sidebar" :style="customImage && { backgroundImage: `url(${customImage})`}">
		<div class="sidebar__back-btn">
			<Link to="/" label="Retour à la liste" icon="arrow-left" is-bold is-icon-prefix />
		</div>
		<Intro v-if="showIntro" />
		<GrowerIntro v-if="!$store.state.isSmallWindow && showAddPerson" />
	</section>
</template>

<style lang="scss" scoped>
.sidebar {
	background: url('../assets/images/hero-bg.png') center center no-repeat;
	background-size: cover;
	min-height: 500px;
	padding: 10px;
	border-radius: 20px;
	position: relative;

	&__back-btn {
		background-color: color(white);
		padding: space(4);
		position: absolute;
		top: 0;
		left: 0;
	}

	.intro {
		background-color: color(white);
		width: 100%;
		display: inline-block;
		padding: space(4);
	}

	.grower {
		background-color: color(white);
		width: 390px;
		margin-top: 0;
		margin-bottom: auto;
		display: inline-block;
		padding: space(3) space(6) space(3) space(6);
	}
}
</style>