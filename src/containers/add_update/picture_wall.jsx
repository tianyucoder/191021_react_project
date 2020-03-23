import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeletePicture} from '../../ajax'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
	};

	setImgs = (imgNameArr)=>{
		console.log('@@@');
		let result = []
		imgNameArr.forEach((imgName,index)=>{
			result.push({uid:-index,name:imgName,url:`/upload/${imgName}`})
		})
		this.setState({fileList:result})
	}
	
	getImgNames = ()=>{
		let result = []
		this.state.fileList.forEach((imgObj)=>{
			result.push(imgObj.name)
		})
		return result
	}

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async({file,fileList}) => {
		if(file.status === 'removed'){
			let {status,msg} = await reqDeletePicture(file.name)
			if(status === 0){
				message.success('删除图片成功')
			}else{
				message.error(msg)
			}
		}
		if(file.status === 'done'){
			const {status,data} = file.response
			if(status === 0){
				message.success('图片上传成功')
				fileList[fileList.length-1].name = data.name
				fileList[fileList.length-1].url = data.url
			}
			//console.log(fileList);
		}
		this.setState({ fileList });
	}

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
					action="/manage/img/upload"
					name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
