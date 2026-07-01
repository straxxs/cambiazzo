export default {
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost/Figus',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
