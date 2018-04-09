import Config from './config.js'

export default {
    install(Vue, options) {
        Vue.prototype.Plugin ={
            ajax (url,params,fun) {
                if (window["api"]) {
                    api.ajax({
                        url: Config.host+url,
                        method: 'post',
                        data: {
                            values:params
                        }
                    }, function(data, err) {
                        fun(data);
                    });
                }else{
                    $.ajax({
                        url: Config.host+url,
                        method: 'post',
                        data: params,
                        success: function(data){
                            fun(data);
                        }
                    });
                }
            },
            camera(type){
            	api.getPicture({
				    sourceType: type,//相机：camera  图库：library
				    encodingType: 'jpg',
				    mediaValue: 'pic',//媒体类型 图片:pic  视频：video
				    destinationType: 'url',
				    quality:50,//图片质量 只针对jpg 1-100整数
				    allowEdit: true,
				    saveToPhotoAlbum: false//拍摄后是否保存到手机
				}, function(ret, err) {
					var data;
				    if (ret) {
				        data["success"]=true;
				        data["url"]=ret.data;
				        return data;
				    } else {
				    	data["success"]=false;
				        data["msg"]=err.msg;
				    }
				});
            },
            close(){
                if (window["api"]) {
                    api.closeWidget({
                        silent:false
                    });
                }else{
                    
                }
            }
		}
    }
}

// var Plugin={
// 	ajax:function(url,params,fun){
// 		if (window["api"]) {
// 			api.ajax({
// 		        url: Config.host+url,
// 		        method: 'post',
// 		        data: {
// 		            values:params
// 		        }
// 	    	}, function(data, err) {
// 	    		fun(data);
// 		    });
// 		}else{
// 			$.ajax({
// 	            url: Config.host+url,
// 				method: 'post',
// 	            data: params,
// 	            success: function(data){
// 	            	fun(data);
// 	            }
// 	        });
// 		}
// 	}
// }