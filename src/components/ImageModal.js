import React ,{useCallback,useContext} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { store } from '../utils/store'
import Image from 'next/image'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline:'0',
};

export default function ImageModal() {

  const { dispatch,state } = useContext(store)

  const {data:item} =state.modal

  const handleClose = useCallback(() => dispatch({type:'CLOSE_MODAL'}),[dispatch])

  return (
    <div>
      <Modal
        open={state.modal.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box sx={style}>
       <Image
        src={item.hasOwnProperty('url_l_cdn') ?item['url_l_cdn'] :item['url_n_cdn'] }
        blurDataURL={item['url_sq_cdn']}
        placeholder="blur"
        width={1024}
        height={800}
        quality={100}
        loading="lazy"
        alt="laztimage"
      />
      </Box>
      </Modal>
    </div>
  );
}