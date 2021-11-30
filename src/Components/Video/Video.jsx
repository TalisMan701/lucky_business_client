import React from 'react';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton
} from 'video-react';

const Video = () => {
	return (
		<div>
			<Player poster="/assets/poster.png">
				<source src="https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%871.mp4" />

				<ControlBar>
					<ReplayControl seconds={10} order={1.1} />
					<ForwardControl seconds={30} order={1.2} />
					<CurrentTimeDisplay order={4.1} />
					<TimeDivider order={4.2} />
					<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
					<VolumeMenuButton disabled />
				</ControlBar>
			</Player>
		</div>
	);
};

export default Video;
