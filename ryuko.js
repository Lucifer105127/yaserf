module.exports = async ({ api }) => {
  const logger = require('./ryuko/catalogs/ryukoc.js')
  const configCustom = {
    autoRestart: {
      status: true,
      time: 40, // 20 minutes
      note: 'to avoid problems, enable periodic bot restarts, set the status to false if you want to disable auto restart function.'
    },
    accpetPending: {
      status: false,
      time: 10, // 10 minutes
      note: 'approve waiting messages after a certain time, set the status to false if you want to disable auto accept message request.'
    }
  }
  function autoRestart(config) {
    if(config.status) {
      setInterval(async () => {
        logger(`auto restart is processing, please wait.`, "kazuma lvl.69")
        process.exit(1)
      }, config.time * 60 * 1000)
    }
  }
  function accpetPending(config) {
    if(config.status) {
      setInterval(async () => {
          const list = [
              ...(await api.getThreadList(1, null, ['PENDING'])),
              ...(await api.getThreadList(1, null, ['OTHER']))
          ];
          if (list[0]) {
              api.sendMessage('this thread is automatically approved by our system.', list[0].threadID);
          }
      }, config.time * 60 * 1000)
    }
  }
  autoRestart(configCustom.autoRestart)
 accpetPending(configCustom.accpetPending)
};
