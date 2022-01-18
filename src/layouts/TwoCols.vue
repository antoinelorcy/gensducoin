<template>
	<div class="two-cols grid">
		<div class="col-lg-3 tc__left">
			<slot name="left" />
		</div>
		<div class="col-lg-9 tc__right">
			<slot name="right" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.tc__left {
	overflow: hidden;
}

.tc__right {
	@include breakpoint(desktop) {
		padding: 0 space(6);
	}

	@include breakpoint (mobile) {
		max-width: 100%;
	}
}
</style>