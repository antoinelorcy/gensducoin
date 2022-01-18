<template>
	<component
		:is="$store.state.isSmallWindow ? 'Modal' : 'div'"
		title="Filtres"
		:visible="mobileModalVisible"
		class="filters"
		@close="$emit('close')"
	>
		<div class="f__head display-flex align-center justify-between">
			<h3 :style="$store.state.isSmallWindow && {opacity: 0}">Filtres</h3>
			<Link label="Réinitialiser les filtres" color="danger" @click="$emit('reset')" />
		</div>

		<div class="f__section">
			<h4>Trier par</h4>
			<Radio v-for="sort in sorts" :key="sort.id" :label="sort.label" :value="sort.checked" @input="$emit('sort', sort.id)"  />
		</div>

		<div class="f__section">
			<h4>Par régions</h4>
			<FilterCollapse show-more-label="Afficher toutes les régions">
				<Checkbox v-for="region in regions" :key="region.id" :label="region.name" v-model="region.checked"  />
			</FilterCollapse>
		</div>

		<!-- <div class="f__section">
			<h4>Par métiers</h4>
			<Checkbox v-for="job in jobs" :key="job.id" :label="job.title" v-model="job.checked"  />
		</div> -->
		
		<div class="text-align--right">
			<Button v-if="$store.state.isSmallWindow" label="Filtrer" @click="$emit('close')" />
		</div>
	</component>
</template>

<script>
import FilterCollapse from './FilterCollapse';

export default {
	components: {
		FilterCollapse
	},

	props: {
		mobileModalVisible: Boolean,
		jobs: Array,
		regions: Array,
		sorts: Array
	}
}
</script>

<style lang="scss" scoped>
.f__head {
	margin-bottom: space(5);

	> h3 {
		margin: 0;
	}
}

.f__section {
	margin-bottom: space(5);

	> h4 {
		margin: 0 0 space(2);
	}
}
</style>