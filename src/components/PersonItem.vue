<template>
	<g-link :to="person.route" class="person-item">
		<div class="p__image">
			<g-image :src="person.thumbnail" width="200" />
		</div>
		<h4>{{ person.name }}</h4>
		<div class="p__jobs">
			<i v-if="person.job">{{ person.job.title }}</i>
		</div>
		<div class="p__footer display-flex">
			<!-- <Tooltip v-if="person.canDeliver" content="Livraison à domicile" class="p__footer-item">
				<Icon name="ship" :size="15" />
			</Tooltip>
			<Tooltip v-if="person.canSell" content="Vente en directe sur place" class="p__footer-item">
				<Icon  name="cart" :size="15" />
			</Tooltip> -->
			<span class="p__footer-item display-flex align-center">
				<Icon name="pin" :size="15" /> <small>{{ person.city.name }} - {{ person.region.name }}</small>
			</span>
		</div>
	</g-link>
</template>

<script>
export default {
	props: {
		person: Object
	}
}
</script>

<style lang="scss" scoped>
.person-item {
	overflow: hidden;
	text-decoration: none;
	color: $body-font-color;
	outline: none;

	&:hover,
	&:focus {
		h4 {
			color: color(primary);
		}

		.p__image {
			box-shadow: 4px 4px 0 rgba(0, 0, 0, .1);
		}

		.p__image img {
			transform: scale(1.1);
		}
	}

	h4 {
		transition: color 0.3s ease;
		margin: space(2) 0 space(1);
	}

	> .p__jobs {
		min-height: 20px;
		margin-bottom: space(1);
	}

	> .p__image {
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: space(3);
		width: 100%;
		height: 140px;
		background-color: color(grey-lighter);
		transition: box-shadow 0.3s ease;

		> img {
			object-fit: cover;
			width: 100%;
			height: 100%;
			transition: transform 0.3s ease;
		}
	}

	.p__footer-item {
		margin-right: space(3);

		> .icon {
			margin-right: space(1);
		}
	}
}
</style>