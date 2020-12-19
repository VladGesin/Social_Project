import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import './Slider.css';
import api from '../../../../../api';

const Slider = () => {
	const [ photos, setPhotos ] = useState([]);
	const [ goPhotos, setGoPhotos ] = useState([]);
	const apiLink = 'https://www.hitprojectscenter.com/social-API/';
	const [ activeIndex, setActiveIndex ] = useState(0);
	const [ animating, setAnimating ] = useState(false);

	useEffect(() => {
		getPhotos();
	}, []);

	useEffect(
		() => {
			getEnablePhotos();
		},
		[ photos ]
	);

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};

	const getPhotos = () => {
		api.get('getAllImages').then((res) => {
			setPhotos(res.data);
		});
	};

	const getEnablePhotos = () => {
		if (goPhotos.length == 0) {
			photos.map((photo) => {
				if (photo.status) {
					goPhotos.push(photo);
				}
			});
		}
	};

	const slides = goPhotos.map((photo) => {
		return (
			<CarouselItem key={photo.path}>
				<img className="d-block w-100" src={`${apiLink}${photo.path}`} alt={photo.path} />
			</CarouselItem>
		);
	});

	return (
		<Carousel activeIndex={activeIndex} next={next} previous={previous} className="mb-2 mt-1">
			{slides}
			<CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
			<CarouselControl direction="next" directionText="Next" onClickHandler={next} />
		</Carousel>
	);
};

export default Slider;
