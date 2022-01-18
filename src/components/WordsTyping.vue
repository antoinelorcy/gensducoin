<template>
	<span class="words-typing">
		<template v-if="prefix">{{ prefix }}</template> <span class="word">{{ displayText.join('') }}</span><span class="cursor">|</span> <template v-if="suffix">{{ suffix }}</template>
	</span>
</template>

<script>
export default {
	props: {
		speed: {
			type: Number,
			default: 100,
		},
		deleteSpeed: {
			type: Number,
			default: 30,
		},
		nextWordInterval: {
			type: Number,
			default: 1200
		},
		words: {
			type: Array,
			default: [],
		},
		prefix: String,
		suffix: String
	},

	data() {
		return {
			displayText: [],
			currentWord: '',
			wordIdx: 0,
			timeoutSpeed: null,
			isWaitingNextWord: false,
			animate: null
		}
	},

	mounted() {
		this.start()
	},

	beforeDestroy () {
		clearTimeout(this.animate);
	},

	methods: {
		start() {
			if (this.words && this.words.length > 0) {
				this.currentWord = this.words[this.wordIdx].split('');
				this.timeoutSpeed = this.speed;
				this.animate = setTimeout(this.type, this.timeoutSpeed);
			}
		},
		type() {
			// if typing...
			if (this.currentWord.length > 0) {
				this.displayText.push(this.currentWord.shift());
				// if done typing, wait for a while
			} else if (!this.isWaitingNextWord && this.currentWord.length === 0 && this.displayText.length === this.words[this.wordIdx].length) {
				this.timeoutSpeed = this.nextWordInterval;
				this.isWaitingNextWord = true;
				// if done typing, then delete
			} else if (this.currentWord.length === 0 && this.displayText.length > 0) {
				this.timeoutSpeed = this.deleteSpeed;
				this.displayText.pop();
				// if done typing & deleting
			} else if (this.currentWord.length === 0 && this.displayText.length === 0) {
				// change words
				if (this.wordIdx < (this.words.length - 1)) {
					this.wordIdx++;
				} else {
					// reset
					this.wordIdx = 0;
				}

				this.timeoutSpeed = this.speed;
				this.isWaitingNextWord = false;
				this.currentWord = this.words[this.wordIdx].split('');
				this.displayText.push(this.currentWord.shift());
			}

			setTimeout(this.type, this.timeoutSpeed);
		},
	},
}
</script>

<style lang="scss" scoped>
.words-typing {
	.cursor {
		display: inline-block;
		font-weight: 400;
		margin-right: 2px;
		animation: blink-animation 1s steps(2, start) infinite;
	}
}

@keyframes blink-animation {
	to {
		visibility: hidden;
	}
}
</style>