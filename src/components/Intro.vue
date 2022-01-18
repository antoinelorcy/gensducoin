<template>
	<div class="intro">
		<h2><WordsTyping suffix ="à votre porte." :words="['Une artiste', 'Un producteur', 'Une fleuriste', 'Un plombier', 'Un indépendant']" /></h2>
		<p>
			Gensducoin est une plateforme de découverte de producteur locaux, indépendant, auto-entrepreneur... près de chez vous.<br/>
			<b>Pour du local, au juste prix</b> !
		</p>
		<Link to="/about/" label="En savoir plus" icon="arrow-right" is-bold />
	</div>
</template>

<script>
import WordsTyping from './WordsTyping';

export default {
	components: {
		WordsTyping
	}
}
</script>