const { createApp } = Vue;

    createApp({
      data() {
        return {
          joke: '',
          loading: false,
          error: ''
        };
      },
      methods: {
        async translateJoke(joke) {
          try {
            const response = await fetch('https://api.mymemory.translated.net/get?q=' + encodeURI(joke) + '&langpair=en|pt');
            const data = await response.json();
            if (data.responseData) {
              return data.responseData.translatedText;
            }
          } catch (error) {
            console.error('Erro ao traduzir piada:', error);
          }
          return 'Desculpe, não foi possível traduzir a piada.';
        },
        async getJoke() {
          this.loading = true;
          this.error = '';

          try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any');
            const data = await response.json();
            if (data.setup && data.delivery) {
              this.joke = `${await this.translateJoke(data.setup)} ${await this.translateJoke(data.delivery)}`;
            } else {
              this.joke = await this.translateJoke(data.joke);
            }
          } catch (error) {
            console.error('Erro ao carregar piada:', error);
            this.error = 'Erro ao carregar piada';
          } finally {
            this.loading = false;
          }
        }
      }
    }).mount('#app');