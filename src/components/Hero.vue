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
		customImage: String,
		minHeight: {
			type: Number,
			default: 270
		}
	}
}
</script>

<template>
	<section class="hero" :style="[{ minHeight: `${minHeight}px` }, customImage && { backgroundImage: `url(${customImage})`}]">
		<div class="inner-width display-flex justify-between">
			<div>
				<Intro v-if="showIntro" />
			</div>
			<GrowerIntro v-if="!$store.state.isSmallWindow && showAddPerson" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
.hero {
	background: url('../assets/images/hero-bg.png') center center no-repeat;
	background-size: cover;
	min-height: 270px;
	max-width: 1040px;
	margin: 0 auto space(5);

	@include breakpoint(desktop) {
		border-radius: 20px;
	}

	.intro {
		background-color: color(white);
		width: 360px;
		margin-top: 120px;
		display: inline-block;
		padding: space(6) space(6) 0 space(6);
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