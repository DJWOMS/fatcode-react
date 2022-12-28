import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { getSupport, selectSupport } from '../store/supportSlice';
import axios from 'axios';


const schema = yup.object().shape({
  category: yup.string().required('You must enter a category'),
  message: yup.string().required('You must enter a message'),

});

function HelpCenterSupport() {
  const dispatch = useDispatch();
  const selectCategory = useSelector(selectSupport)

const defaultValues = {
    category: '',
    message: '',
    image:'',
    video:''
  
  };

  const { control, handleSubmit, watch, formState,setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('category', '', { shouldDirty: true, shouldValidate: true });
    setValue('message', '', { shouldDirty: true, shouldValidate: true }); 
    setValue('image', '', { shouldDirty: true, shouldValidate: false });
    setValue('video', '', { shouldDirty: true, shouldValidate: false });
   
  }, [setValue]);
  
  useEffect(()=>{

   dispatch(getSupport())

  },[dispatch])

  function onSubmit(data,e) {
 
    const formData = new FormData()
    const image = e.target.image.files[0];
    const video = e.target.video.files[0];

    formData.append('category',data.category)
    formData.append('text',data.message)
    formData.append('image', image == undefined? '': image) 
    formData.append('video', video == undefined? '': video) 

    axios.defaults.headers.common['Authorization'] = 'Token 16dfc012b3f46277e7dcdb645c35457b759baa57';
    axios.post('http://194.67.110.24/api/v1/support/reports/', formData, {
      headers: {
         'Content-Type': 'multipart/form-data', 
    },}).then((data)=>data.status==200)
  }

  return (
    <div className="flex flex-col items-center p-24 sm:p-40 container">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="sm:mt-32">
          <Button
            component={Link}
            to="/apps/help-center"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>}
          >
            Back to Help Center
          </Button>
        </div>
        <div className="mt-8 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
          Contact support
        </div>

            
        <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
      
          <form 
          className="px-0 sm:px-24"
          onSubmit={handleSubmit(onSubmit)} 
          >
            
            <div className="mb-24">
              <Typography className="text-2xl font-bold tracking-tight">
                Submit your request
              </Typography>
              <Typography color="text.secondary">
                Your request will be processed and our support staff will get back to you in 24
                hours.
              </Typography>
            </div>
            <div className="space-y-32 ">

              <Controller
                
                control={control}
                name="category"
                render={({ field }) => (
               
                    <TextField 
                    {...field} 
                    id="select" 
                    label="Category" 
                    error={!!errors.subject}
                    fullWidth 
                    className='mt-16'
                    required 
                    select>
                      {Object.values(selectCategory) && Object.values(selectCategory).map(item=> <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                    </TextField>
                )}
              />
              <Controller
                control={control}
                name="message"
                
                render={({ field }) => (
                  
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Message"               
                    variant="outlined"
                    minRows={3}
                    multiline
                    fullWidth
                    error={!!errors.subject}
                    helperText={errors?.subject?.message}
                    required
                  />
                )}
              />
               <Controller
                 control={control}
                 name="image" 
                 render={({ field }) => (
                  <div  className="mt-16 "  component="label">
                      <div className="mb-10 font-medium">
                      Upload Image
                      </div>
                    <input {...field}    accept= "image/*" multiple type="file" />
                  
                  </div>
              
                )}
              />

              <Controller
                 control={control}
                 name="video"
                 render={({ field }) => (

                  <div  className="mt-16"  component="label">
                    <div className="mb-10 font-medium">
                    Upload Video
                    </div>
                    <input {...field}  accept= "video/*" multiple type="file" />
                  </div>
                )}
              />

            </div>

            <div className="flex items-center justify-end mt-32">
            <Button className="mx-8" >Cancel</Button>
            <Button 
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type = "submit"
              className="mx-8"
              variant="contained"
              color="secondary"
            >
              Save
            </Button>
          </div>
          
          </form>
        </Paper>

      
      </div>
    </div>
  );
}

export default HelpCenterSupport;
