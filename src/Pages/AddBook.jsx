import React, { useState } from 'react'

function AddBook() {
    const [url,setUrl] = useState('https://i.ibb.co/r0d6F7Y/pexels-photo-3881104.jpg');
    const [error,setError] = useState(false);


    function checkUrl(e){
        const currUrl = e.target.value;
        setUrl(currUrl); 
        setError(false)

    }
    function handleSubmit(){

    }
  return (
    <div className='flex justify-center py-4'>

<form onSubmit={handleSubmit} className="min-w-80 mx-auto ">

<img className='hidden' src={url} alt="alternate image" onError={() => setError(true)} />
<div className="mb-5 flex gap-2">
    <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Place name</label>
        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Inani Beach" required />
    </div>
    
    <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-900">Photo Url</label>
        <input onChange={checkUrl} type="text" name = 'photoUrl' id="photoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="https://picture.png"  required />
        <div className='h-5'>                            
            { error && <p className='text-xs text-red-500'>Invalid url</p>}
        </div>
    </div>
</div>
<div className='flex gap-2'>
    <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
        <input type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Cox's Bazar" required />
    </div>
    <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-900">Country</label>
        <input type="text" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Bangladesh" required />
    </div>
</div>


<div className="mb-5 flex gap-2">
    <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">Average Cost</label>
        <input type="number" name = 'avgCost' id="avgCost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="75000"  required />
    </div>
    <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-900">Travel Time (Days)</label>
        <input type="number" name = 'travelTime' id="travelTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="7"  required />
    </div>
</div>

{/* <div className="mb-5 ">
    <label className="block mb-2 text-sm font-medium text-gray-900">Short Description</label>
    <input type="text" defaultValue={desc} name = 'description' id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500" required />
    {charLeft > 0 && <p className='text-red-500 text-xs'> Description should be more than 70 characters. {charLeft} characters left</p>}
</div> */}

<div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900">Seasonality</label>
    <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center">
            <input type="checkbox" name="seasonality" value="winter" className="form-checkbox h-4 w-4 text-green-500" />
            <span className="ml-2 text-sm">Winter</span>
        </label>
        <label className="inline-flex items-center">
            <input type="checkbox" name="seasonality" value="summer" className="form-checkbox h-4 w-4 text-green-500" />
            <span className="ml-2 text-sm">Summer</span>
        </label>
        <label className="inline-flex items-center">
            <input type="checkbox" name="seasonality" value="fall" className="form-checkbox h-4 w-4 text-green-500" />
            <span className="ml-2 text-sm">Fall</span>
        </label>
        {/* Add more checkboxes for other seasons */}
    </div>
</div>


<button type="submit" className="mt-2 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Place</button>

</form> 
    </div>
  )
}

export default AddBook