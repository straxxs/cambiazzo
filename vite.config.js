export default {
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/Figus',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
