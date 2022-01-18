<template>
	<header class="header">
		<div class="header__layout inner-width">
			<div class="header__left">
			<g-link to="/"><Logo /></g-link>
			<section class="header__menu">
				<Link to="/" label="Découvrir" />
				<Link to="/about/" label="Le concept" />
			</section>
			</div>
			<div class="header__right">
				<Button
					v-if="$store.state.isSmallWindow"
					icon="menu"
					@click="burgerMenuVisible = true"
				/>
				<template v-else-if="$route.path !== '/new/'">
					<div class="hr__button">
						<Button to="/new/" icon="plus" label="Ajouter mon activité" />
					</div>
				</template>
			</div>
		</div>
		<BurgerMenu :visible="burgerMenuVisible" @close="burgerMenuVisible = false" />
	</header>
</template>

<script>
import Logo from './Logo';
import BurgerMenu from './BurgerMenu';

export default {
	components: {
		Logo,
		BurgerMenu
	},
	data () {
		return {
			modalGrowerVisible: false,
			burgerMenuVisible: false
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	height: 100px;
}

.header__layout {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
}

.header__left {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.header__menu {
	margin-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

	&:before {
		content: '';
		height: 1px;
		width: 6rem;
		background-color: color(grey-light);
		display: block;
		margin-right: 1rem;
	}

	.link {
		color: color(grey);
		margin: 0 1rem;

		&.active--exact {
			color: color(primary);
			font-weight: bold;
		}
	}
}

.hr__button {
	position: relative;

	&:before {
		content: '';
		position: absolute;
		z-index: 0;
		top: -30px;
		right: 10px;
		background: url('../assets/images/carot.svg') no-repeat;
		width: 30px;
		height: 30px;
	}

	> button {
		position: relative;
		z-index: 1;
	}
}

@include breakpoint(mobile) {
	.header {
		height: 60px;
	}

	.header__menu {
		display: none;
	}
}
</style>