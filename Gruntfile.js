// Gruntfile.js

module.exports = function(grunt) {

  // 1. Inicializa a configuração do Grunt
  grunt.initConfig({

    // Obtém as informações do package.json para usar em tarefas
    pkg: grunt.file.readJSON('package.json'),

    // 2. Configuração da tarefa de compilação do LESS
    less: {
      development: {
        // Indica que a tarefa irá processar os arquivos do ambiente de desenvolvimento
        files: {
          'dist/css/style.css': 'src/less/style.less'
        }
      }
    },

    // 3. Configuração da tarefa de compressão do JavaScript
    uglify: {
      options: {
        // Gera um banner no topo do arquivo com informações
        banner: '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          // O arquivo de destino e o arquivo de origem
          'dist/js/main.min.js': 'src/js/main.js'
        }
      }
    },

    // 4. Configuração da tarefa de monitoramento (watch)
    // Usado para automatizar a execução das tarefas
    watch: {
      less: {
        // Quais arquivos serão monitorados
        files: ['src/less/**/*.less'],
        // Quais tarefas serão executadas quando houver mudança
        tasks: ['less']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify']
      }
    }

  });

  // 5. Carrega os plugins instalados
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch'); // Adiciona o plugin de monitoramento

  // 6. Registra as tarefas.
  // Você pode rodar 'grunt less' ou 'grunt uglify' separadamente.
  // Ou rodar 'grunt default' para executar todas as tarefas.
  grunt.registerTask('default', ['less', 'uglify']);
  grunt.registerTask('build', ['less', 'uglify']);
  
  // Adiciona uma tarefa de monitoramento para desenvolvimento
  grunt.registerTask('dev', ['watch']);

};
