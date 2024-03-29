import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { FaFilter, FaAngleLeft } from 'react-icons/fa';
import imgFour from './../images/imgFour.jpg';

import { finalData } from '../data';

import { motion, AnimatePresence } from 'framer-motion';

const categories = [
	{
		id: 1,
		title: 'CASUALWEAR',
	},
	{
		id: 2,
		title: 'ACTIVEWEAR',
	},
	{
		id: 3,
		title: 'TEAMWEAR',
	},
];

const Products = () => {
	//  main state used to display products with inital display of all products
	const [products, setProducts] = useState(finalData);

	// state to control subcategory option
	const [subcategoryFilter, setSubcategoryFilter] = useState('');

	// state for displaying all filters
	const [showFilters, setShowFilters] = useState(false);

	// state to control search component
	const [searchInput, setSearchInput] = useState('');

	// state to display product modal
	const [modal, setModal] = useState(false);

	// Comment it
	const [prodId, setProdId] = useState('');

	const handleModal = (id) => {
		setModal(!modal);

		setProdId(id);
	};

	// Pagination
	const [pageNum, setPageNum] = useState(0);

	const productsPerPage = 8;
	const pagesVisited = pageNum * productsPerPage;
	const pageCount = Math.ceil(products.length / productsPerPage);
	const handlePageChange = ({ selected }) => {
		setPageNum(selected);
	};

	// Display Paginated Products

	const displayProducts = products.slice(pagesVisited, pagesVisited + productsPerPage).map((el, index) => {
		return (
			<motion.div
				layout
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				className="h-full w-56 bg-neutral-100 shadow-lg m-2 p-2 rounded-lg"
				key={index}
			>
				<img src={el.productImg} alt="" className="h-40 w-full object-cover object-center rounded-lg" loading="lazy" />
				<div className="h-full">
					<h2 className="text-darkGray font-semibold mt-2">{el.productName}</h2>
					<h3 className="text-darkGray font-normal text-xs ">{el.mainCategory}</h3>
					<button
						className="w-full py-1 mt-2 text-sm font-medium text-gray-50 bg-lightRed rounded-xl hover:bg-red-800 transition-all "
						onClick={() => handleModal(el.id)}
					>
						View Product
					</button>
				</div>
			</motion.div>
		);
	});

	// display modal based on selected product
	const displayModal = (prodId) => {
		const productData = products.find((el) => el.id === prodId);

		return (
			<div className="fixed bg-darkGray bg-opacity-60 w-full inset-0  flex flex-col justify-start items-center">
				<div className=" overflow-y-scroll md:overflow-y-hidden w-72 md:w-3/5 md:my-auto bg-opacity-100 text-darkGray border border-stone-300 bg-neutral-100 shadow-2xl">
					<div
						className=" flex items-center justify-start py-4 px-2 cursor-pointer border-b border-stone-300"
						onClick={() => setModal(!modal)}
					>
						<FaAngleLeft />
						<span className="text-xs md:text-sm font-medium mx-2 hover:text-lightRed transition-all"> BACK TO ALL PRODUCTS</span>
					</div>
					<div className="md:flex">
						<img src={productData.productImg} alt="" className=" w-full h-72 md:w-1/2 md:h-screen object-cover object-center " />
						<div className="h-full p-3 md:overflow-y-auto">
							<h2 className="font-semibold text-xl md:text-2xl"> {productData.productName} </h2>
							<h3 className="font-medium text-sm md:text-base"> {productData.mainCategory}</h3>
							<h6 className="text-xs font-medium mt-2 md:text-base"> {productData.article}</h6>
							<p className="my-2 text-sm md:text-base md:my-6">
								{' '}
								Discover the perfect fusion of style and comfort with our versatile collection of casual wear and activewear. Embrace every
								moment with confidence, as our meticulously crafted garments boast premium quality materials and a seamless blend of
								fashion-forward designs. Elevate your wardrobe and embrace an unparalleled experience in clothing excellence.
							</p>
							<Link to="/customorder">
								<button className="py-3 px-2 mt-2 text-sm md:p-3 border border-gray-300 font-semibold text-darkGray rounded-md hover:bg-stone-300 transition-all">
									{' '}
									SEND INQUIRY{' '}
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	};

	// all subcategories data for subcategory options filter

	const allSubcategories = finalData.map((el) => el.subCategory);

	// unique subcategories to avoid duplication in filter list
	const uniqueSubcategories = [...new Set(allSubcategories)];

	// Function to filter products based on selected main category of products
	const handleCategory = (category) => {
		const selectedCategory = finalData.filter((el) => el.mainCategory.toUpperCase() === category.toUpperCase());
		setProducts(selectedCategory);
	};

	// Function to search products based on search input
	const searchedProducts = () => {
		const product = finalData.filter((el) => el.productName.toLowerCase().includes(searchInput.toLowerCase()));
		setProducts(product);
	};

	// Function to search products based on subcategory filter
	const subCategoryproducts = (subcat) => {
		const products = finalData.filter((el) => el.subCategory.toLowerCase() === subcat.toLowerCase());
		setProducts(products);
	};

	// For handling onChange event of search input
	const handleChange = (e) => {
		setSearchInput(e.target.value);
		searchedProducts();
	};

	const handleSearchClick = (e) => {
		e.preventDefault();
		searchedProducts();
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			searchedProducts();
		}
	};

	// handle filter function for subcategories

	const handleFilter = (e) => {
		setSubcategoryFilter(e.target.value);
		subCategoryproducts(e.target.value);
	};

	return (
		<div className="relative w-full h-full bg-gray-50 overflow-hidden">
			<div className="w-full h-full relative">
				<img src={imgFour} className="w-full h-56 object-cover object-bottom" alt="athlete doing exercise wearing fitness clothes" />
				<div className="absolute inset-0 flex items-center justify-center ">
					<h2 className="   text-xl text-neutral-50 font-bold bg-lightRed p-2 rounded-md opacity-90"> OUR PRODUCTS </h2>
				</div>
			</div>
			<div className="p-2 mt-3 flex flex-wrap justify-center">
				{categories.map((el) => {
					return (
						<button
							className="p-3 m-1 text-darkGray font-semibold text-sm border border-stone-300 rounded-md hover:bg-lightRed hover:text-gray-50 transition-all"
							key={el.id}
							onClick={() => handleCategory(el.title)}
						>
							{' '}
							{el.title}{' '}
						</button>
					);
				})}
			</div>
			<div className="p-2 ">
				<button
					className="w-56 mx-auto text-darkGray text-sm flex p-2 font-medium rounded-md justify-center items-center border border-gray-300"
					onClick={() => setShowFilters(!showFilters)}
				>
					{' '}
					<span className="mx-2">
						{' '}
						<FaFilter />{' '}
					</span>{' '}
					Product Filters{' '}
				</button>
			</div>

			{showFilters && (
				<div className="px-4 mt-4 mb-6 md:flex md:justify-around">
					<input
						type="text"
						value={searchInput}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						placeholder="Search products"
						className="w-full p-2 md:w-2/5 text-darkGray bg-stone-200 rounded-md focus:outline-none"
					/>
					<select
						color="red"
						className=" md:w-2/5 p-2  text-darkGray w-full mt-2 md:mt-0 border border-gray-300 rounded-md focus:outline-none"
						value={subcategoryFilter}
						onChange={handleFilter}
					>
						<option value="">Choose a subcategory</option>
						{uniqueSubcategories.map((el) => {
							return <option value={el}> {el} </option>;
						})}
					</select>
				</div>
			)}
			<motion.div layout className="w-full h-full flex flex-col md:flex-row md:flex-wrap justify-center items-center p-2">
				<AnimatePresence>{displayProducts}</AnimatePresence>
			</motion.div>
			{modal && displayModal(prodId)}
			<div className="py-4">
				<ReactPaginate
					previousLabel={'Previous'}
					nextLabel={'Next'}
					pageCount={pageCount}
					onPageChange={handlePageChange}
					containerClassName={'paginationBtns'}
					nextLinkClassName={'nextBtn'}
					previousLinkClassName={'previousBtn'}
					disabledClassName={'paginationDisabled'}
					activeClassName={'paginationActive'}
				/>
			</div>
		</div>
	);
};

export default Products;
