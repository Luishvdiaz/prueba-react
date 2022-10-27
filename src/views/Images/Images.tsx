import React, { useState } from 'react';

import { FileInputData } from '../../interfaces';

import './styles.scss';

const Images: React.FC = () => {
  const [images, setImages] = useState<FileInputData[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const handleSelectFile = (filesData: FileInputData[]) => {
    setImages(filesData);
    console.log(filesData);

    const fileInput: any = document.getElementById('file-input');

    if (fileInput) {
      fileInput.value = null;
    }
  };

  const onSetFile = async (event: any) => {
    try {
      const filesData: FileInputData[] = [];

      const { files } = event.target;

      for (let index = 0; index < files.length; index += 1) {
        filesData.push({
          fileName: files[index].name,
          data: files[index]
        });
      }

      handleSelectFile(filesData);
    } catch (error: any) {
      console.log(error);
    }
  };

  const dropHandler = (event: any) => {
    const filesData: FileInputData[] = [];
    event.preventDefault();

    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();

          filesData.push({
            fileName: file.name,
            data: file
          });
        }
      }

      handleSelectFile(filesData);
    } else {
      for (let i = 0; i < event.dataTransfer.files.length; i += 1) {
        filesData.push({
          fileName: event.dataTransfer.files[i].name,
          data: event.dataTransfer.files[i]
        });
      }

      handleSelectFile(filesData);
    }

    removeDragData(event);
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
  };

  const removeDragData = (event: any) => {
    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
    } else {
      event.dataTransfer.clearData();
    }
  };

  return (
    <div className='images'>
      <div className='images__form'>
        <input
          id='file-input'
          name='file-input'
          aria-label='Archivos'
          type='file'
          accept=".png,.jpeg,.jpg"
          onChange={onSetFile}
          multiple={true}
        />
        <label
          className='images__form__label'
          htmlFor='file-input'
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
        >
          <p >Arrastra aquí las imagenes o da clic aquí</p>
        </label>
      </div>
      {
        images[selectedImage] && (
          <>
            <div className='images__image-container'>
              <button
                className='images__image-container__button'
                disabled={selectedImage === 0}
                onClick={() => {
                  setSelectedImage(selectedImage - 1);
                }}
              >Anterior</button>
              <div className='images__image-container__item-container'>
                <img className='images__image-container__item' src={URL.createObjectURL(images[selectedImage].data)} alt={images[selectedImage].fileName} />
              </div>
              <button
                className='images__image-container__button'
                disabled={selectedImage === images.length - 1}
                onClick={() => {
                  setSelectedImage(selectedImage + 1);
                }}
              >Siguiente</button>
            </div>
            <button className='images__button' onClick={() => console.log(images)} >Guardar imágenes</button>
          </>
        )
      }
    </div>
  );
};

export default Images;
