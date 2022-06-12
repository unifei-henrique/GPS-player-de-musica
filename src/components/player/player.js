import { useEffect, useRef } from 'react';
import './player.css';
import {
	BsFillPlayCircleFill,
	BsFillPauseCircleFill,
	BsFillSkipStartCircleFill,
	BsFillSkipEndCircleFill,
} from 'react-icons/bs';

export const Player = (props) => {
	const {
		songs,
		audioElement,
		isPlaying,
		setIsPlaying,
		currentSong,
		setCurrentSong,
	} = props;

	const clickRef = useRef();

	useEffect(() => {
		isPlaying ? audioElement.current.play() : audioElement.current.pause();
	}, [currentSong.title, audioElement, isPlaying]);

	function PlayPause() {
		setIsPlaying(!isPlaying);
	}

	function checkWidth(e) {
		let width = clickRef.current.clientWidth;
		const offset = e.nativeEvent.offsetX;
		const progressBar = (offset / width) * 100;
		audioElement.current.currentTime = (progressBar / 100) * currentSong.length;
	}

	function skipBack() {
		const index = songs.findIndex((x) => x.title === currentSong.title);
		if (index === 0)
			setCurrentSong({
				...songs[songs.length - 1],
				progress: 0,
				length: audioElement.current.duration,
			});
		else
			setCurrentSong({
				...songs[index - 1],
				progress: 0,
				length: audioElement.current.duration,
			});
	}

	function skiptoNext() {
		const index = songs.findIndex((x) => x.title === currentSong.title);
		if (index === songs.length - 1)
			setCurrentSong({
				...songs[0],
				progress: 0,
				length: audioElement.current.duration,
			});
		else
			setCurrentSong({
				...songs[index + 1],
				progress: 0,
				length: audioElement.current.duration,
			});
	}

	return (
		<div className='player_container'>
			<div className='title'>
				<p>{currentSong.title}</p>
			</div>
			<div className='navigation'>
				<div className='navigation_wrapper' onClick={checkWidth} ref={clickRef}>
					<div
						className='seek_bar'
						style={{ width: `${currentSong.progress + '%'}` }}
					></div>
				</div>
			</div>
			<div className='controls'>
				<BsFillSkipStartCircleFill className='btn_action' onClick={skipBack} />
				{isPlaying ? (
					<BsFillPauseCircleFill
						className='btn_action pp'
						onClick={PlayPause}
					/>
				) : (
					<BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause} />
				)}
				<BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext} />
			</div>
		</div>
	);
};
