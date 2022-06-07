import api from '@/utils/api'
const nnsCanisterId = 'ko3m5-ayaaa-aaaam-aaeia-cai';

const whitelist = [
  nnsCanisterId,
];

const plug = {
  arrayBufferToString(buffer, encoding, callback){
    var blob = new Blob([buffer],{type:'text/plain'});
        var reader = new FileReader();
        reader.onload = function(evt){callback(evt.target.result);};
        reader.readAsText(blob, encoding);
  },
  async onButtonPress(callback) {
      try {
        await window.ic.plug.requestConnect({
            whitelist,
          });
        const result = await window.ic.plug.isConnected();
        if(result){
          const principalId = await window.ic.plug.agent.getPrincipal();
          let userName = principalId+'';
          api.login({        
            userName
          }).then(res=> {
              // 执行某些操作
              if(res.code == 0){
                api.taskClaim({
                  userName,
                  taskId: 1
                });
                callback(res)
              }
          }) 
        }
      } catch (e) {
        if(!window.ic){
          window.open('https://plugwallet.ooo/');
          // window.location.href="https://plugwallet.ooo/";
        }
        console.log(e);
      }
  },

}

export default plug;