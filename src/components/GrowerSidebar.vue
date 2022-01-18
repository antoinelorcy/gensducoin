<template>
	<div class="grower-sidebar">
		<Link class="gs__back" icon="arrow-left" is-icon-prefix label="Retour à la liste" @click="$router.back()" />
		<g-image :src="grower.thumbnail.url" class="gs__image m--b-4" width="300" />
		
		<div v-if="grower.canSell" class="display-flex m--b-2">
			<Icon name="cart" class="m--r-2" /> Vente en directe sur place
		</div>
		
		<div v-if="grower.canDeliver" class="display-flex m--b-2">
			<Icon name="ship" class="m--r-2" /> Livraison à domicile
		</div>

		<div class="m--t-6">
			<div v-if="grower.email">
				<Button icon="email" label="Envoyer un message" class="m--b-2" />
			</div>
			<div v-if="grower.phone">
				<Button icon="phone" fill="hollow" label="Voir le numéro" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		grower: Object
	}
}
</script>

<style lang="scss" scoped>
.gs__back {
	@include breakpoint(desktop) {
		background-color: rgba(color(black), 0.5);
		color: color(white);
		border-radius: 5px 5px 0 0;
	}
}

.gs__image {
	width: 100%;
	border-radius: 10px;
	box-shadow: 4px 4px 0 rgba(0, 0, 0, .1);

	@include breakpoint(desktop) {
		border-radius: 0 10px 10px 10px;
	}
}
</style>