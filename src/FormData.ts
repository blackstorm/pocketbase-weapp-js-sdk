import mime from 'mime-types'

export default class FormData {
    private fileManager: any = wx.getFileSystemManager();
    private data: any = {}
    private files: any[] = []

    public append(name:any, value: any) {
        this.data[name] = value;
        return true;
    }

    public appendFile(name: any, path: any, fileName: any) {
        let buffer = this.fileManager.readFileSync(path);
        if(Object.prototype.toString.call(buffer).indexOf("ArrayBuffer") < 0){
          return false;
        }
    
        if(!fileName){
          fileName = this.getFileNameFromPath(path);
        }
    
        this.files.push({
          name: name,
          buffer: buffer,
          fileName: fileName
        });
        return true;
    }

    public getData() {
        return this.convert(this.data, this.files)
    }

    private convert(data: any, files: any) {
        let boundaryKey = 'wxmpFormBoundary' + this.randString(); // 数据分割符，一般是随机的字符串
        let boundary = '--' + boundaryKey;
        let endBoundary = boundary + '--';
      
        let postArray: any[] = [];
        //拼接参数
        if(data && Object.prototype.toString.call(data) == "[object Object]"){
          for(let key in data){
            postArray = postArray.concat(this.formDataArray(boundary, key, data[key]));
          }
        }
        //拼接文件
        if(files && Object.prototype.toString.call(files) == "[object Array]"){
          for(let i in files){
            let file = files[i];
            postArray = postArray.concat(this.formDataArray(boundary, file.name, file.buffer, file.fileName));
          }
        }
        //结尾
        let endBoundaryArray = [];
        endBoundaryArray.push(...this.toUtf8Bytes(endBoundary));
        postArray = postArray.concat(endBoundaryArray);
        return {
          contentType: 'multipart/form-data; boundary=' + boundaryKey,
          buffer: new Uint8Array(postArray).buffer
        }
    }

    private randString() {
        var result = '';
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = 17; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    private getFileNameFromPath(path: string){
        let idx=path.lastIndexOf("/");
        return path.substr(idx+1);
    }

    private formDataArray(boundary: any, name: any, value: any, fileName?: any){
        let dataString = '';
        let isFile = !!fileName;
      
        dataString += boundary + '\r\n';
        dataString += 'Content-Disposition: form-data; name="' + name + '"';
        if (isFile){
          dataString += '; filename="' + fileName + '"' + '\r\n';
          dataString += 'Content-Type: ' + mime.lookup(fileName) + '\r\n\r\n';
        }
        else{
          dataString += '\r\n\r\n';
          dataString += value;
        }
      
        var dataArray = [];
        dataArray.push(...this.toUtf8Bytes(dataString));
      
        if (isFile) {
          let fileArray = new Uint8Array(value);
          dataArray = dataArray.concat(Array.prototype.slice.call(fileArray));
        }
        dataArray.push(...this.toUtf8Bytes("\r"));
        dataArray.push(...this.toUtf8Bytes("\n"));
      
        return dataArray;
      }

      private toUtf8Bytes(str: any) {
        var bytes = [];
        for (let i = 0; i < str.length; i++) {
          bytes.push(...this.utf8CodeAt(str, i));
          if (str.codePointAt(i) > 0xffff) {
            i++;
          }
        }
        return bytes
    }

      private utf8CodeAt(str: string, i: number) {
        var out = [], p = 0;
        var c = str.charCodeAt(i);
        if (c < 128) {
          out[p++] = c;
        } else if (c < 2048) {
          out[p++] = (c >> 6) | 192;
          out[p++] = (c & 63) | 128;
        } else if (
            ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
            ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
          // Surrogate Pair
          c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
          out[p++] = (c >> 18) | 240;
          out[p++] = ((c >> 12) & 63) | 128;
          out[p++] = ((c >> 6) & 63) | 128;
          out[p++] = (c & 63) | 128;
        } else {
          out[p++] = (c >> 12) | 224;
          out[p++] = ((c >> 6) & 63) | 128;
          out[p++] = (c & 63) | 128;
        }
        return out;
      }
}
