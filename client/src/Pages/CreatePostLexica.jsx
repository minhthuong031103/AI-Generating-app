import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { createPost } from '../helper/helper';
export default function CreatePostLexica() {
  const navigate = useNavigate();
  const [temp, setTemp] = useState();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const convertToBase64 = async function (imageUrl) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const logClick = function () {
    console.log(form.photo);
  };
  const generateImage = async function () {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        await fetch(`https://lexica.art/api/v1/search?q=${form.prompt}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then(async (data) => {
            if (data.images && data.images.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * data.images.length
              );
              const imageUrl = data.images[randomIndex].src;
              const base64data = await convertToBase64(imageUrl);
              setForm({ ...form, photo: base64data });
            } else {
              alert('No images found for the prompt');
            }
          });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async function () {
    try {
      setLoading(true);
      let CreatePostpromise = createPost(form);
      CreatePostpromise.then(function () {
        setLoading(false);
        toast.success('Shared');
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = function (e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = function () {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section
      className="max-w-7xl mx-auto
  "
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Generate image with Lexica
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px] ">
          Lexica is a cutting-edge generating image API that enables effortless
          creation and manipulation of dynamic images. With its advanced
          algorithms and extensive library, developers can easily generate
          stunning visuals for a wide range of applications. Unlock the power of
          Lexica and transform your creative visions into reality.
        </p>
      </div>
      <form className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Minh Thuong"
            value={form.name}
            handleChange={handleChange}
          />
        </div>
        <div className="flex flex-col py-5 gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a sea otter with a pearl earring by Johannes Vermeer"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div
            className="relative bg-gray-50 border border-gray-300
          text-gray-900 text-sm rounded-lg focus:ring-blue-500 
          focus:border-blue-500 w-64 p-3 h-64 flex 
          justify-center items-center"
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              ></img>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              ></img>
            )}
            {generatingImg && (
              <div
                className="absolute inset-0 z-0 flex justify-center 
              items-center 
              bg-[rgba(0,0,0,0.5)]
              rounded-lg"
              >
                <Loader></Loader>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium
          rounded-md text-sm w-full sm:w-auto px-5 py-2.5
          text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate Image '}
          </button>
        </div>
        <div className="mt-2 text-[#666e75] text-[14px]">
          <p>
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          {loading ? (
            <div
              className="absolute inset-0 z-0 flex justify-center 
              items-center 
              bg-[rgba(0,0,0,0.5)]
              rounded-lg"
            >
              <Loader></Loader>
            </div>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="mt-3 text-white bg-[#6469ff] font-medium
          rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? 'Sharing...' : 'Share with the community'}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
