<template>
	<div class="people-list grid">
		<div class="col-lg-4" v-for="person in people" :key="person.id">
			<PersonItem :person="person" />
		</div>
	</div>
</template>

<script>
import PersonItem from './PersonItem';

export default {
  components: {
    PersonItem
  },
  props: {
	  people: Array
  }
}
</script>

<style lang="scss" scoped>
.people-list {
	margin: space(4) -#{space(3)};

	> div {
		padding: 0 space(3);
		overflow: hidden;
		margin-bottom: space(6);
	}
}
</style>