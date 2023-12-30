const path = require('path');
const injector = require('hexo-extend-injector2')(hexo);
injector.register('body-end', `<script>
((window.gitter = {}).chat = {}).options = {
  room: 'your-room-name',
  activationElement: false
};
</script>`);
injector.register('body-end', '<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>');
injector.register('js', path.resolve(hexo.base_dir, 'any/gitter.js'));