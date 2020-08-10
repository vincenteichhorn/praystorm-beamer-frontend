import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { TextField, Box, Divider } from '@material-ui/core';
import { Slide, Part } from '../../../models/DataModels';

interface Props {
  slides: Slide[] | undefined;
  currentPart: Part | undefined;
}

const General: FunctionComponent<Props> = (props) => {

  const [partTitle, setPartTitle] = useState('');
  const [copyrightAlbum, setCopyrightAlbum] = useState('');
  const [copyrightAuthor, setCopyrightAuthor] = useState('');
  const [copyright, setCopyright] = useState('');

  useEffect(() => {
    setPartTitle((props.currentPart?.title) ? props.currentPart?.title : '');
    if(props.slides) {
      if(props.slides[0]) {
        setCopyrightAlbum((props.slides[0].copyright?.album) ? props.slides[0]?.copyright.album : '');
        setCopyrightAuthor((props.slides[0].copyright.author) ? props.slides[0]?.copyright.author : '');
        setCopyright((props.slides[0].copyright.copyright) ? props.slides[0]?.copyright.copyright : '');
      }
    }
  }, [props])

  return (
    <Box>
      <TextField 
        style={{marginBottom: '8px'}}
        label="Part Title"
        fullWidth
        variant="outlined"
        value={partTitle}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setPartTitle(event.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Divider />
      <TextField 
        style={{marginBottom: '8px', marginTop: '10px'}}
        label="Copyright Album"
        fullWidth
        variant="outlined"
        value={copyrightAlbum}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCopyrightAlbum(event.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField 
        style={{marginBottom: '8px', marginTop: '10px'}}
        label="Copyright Author"
        fullWidth
        variant="outlined"
        value={copyrightAuthor}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCopyrightAuthor(event.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField 
        style={{marginBottom: '8px', marginTop: '10px'}}
        label="Copyright"
        fullWidth
        variant="outlined"
        value={copyright}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCopyright(event.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}

export default General;