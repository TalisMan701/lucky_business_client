import React from 'react';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton,
	BigPlayButton
} from 'video-react';

const Video = (props) => {
	return (
		<div>
			<Player poster="/assets/poster.png" ref={props.refPlayer}>
				<source src={props.url} />
				<BigPlayButton position="center" />
				<ControlBar>
					<VolumeMenuButton vertical />
					<ReplayControl seconds={10} order={1.1} />
					<ForwardControl seconds={30} order={1.2} />
					<CurrentTimeDisplay order={4.1} />
					<TimeDivider order={4.2} />
					<PlaybackRateMenuButton rates={[2, 1.5, 1, 0.75, 0.5]} order={7.1} />
					<VolumeMenuButton disabled />
				</ControlBar>
			</Player>
		</div>
	);
};

export default Video;
