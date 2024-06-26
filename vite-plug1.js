export default function plug1() {
    return {
      name: 'custom-hmr',
      enforce: 'post',
      // HMR
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.json')) {
          console.log('reloading json file...');
  
          server.ws.send({
            type: 'full-reload',          
            path: '*'
          });
        }
        if (file.endsWith('.glb')) {
          console.log('reloading glb file...');
  
          server.ws.send({
            type: 'full-reload',          
            path: '*'
          });
        }
      },
    }
}