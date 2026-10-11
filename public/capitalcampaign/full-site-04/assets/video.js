'use strict';
const filmPoster = document.getElementById('concept-video-poster');
const filmPanel = document.getElementById('concept-video-player');
const filmMount = document.getElementById('concept-video-mount');
const filmStatus = document.getElementById('concept-video-status');
filmPoster?.addEventListener('click', () => {
  const player = document.createElement('iframe');
  player.src = 'https://www.youtube-nocookie.com/embed/uDspROyTuZs?rel=0&playsinline=1&autoplay=1';
  player.title = 'Cumberland County Historical Society — architectural concept by McKissick Associates';
  player.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
  player.allowFullscreen = true;
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  player.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
  filmMount.replaceChildren(player);
  filmPoster.hidden = true;
  filmPoster.setAttribute('aria-expanded', 'true');
  filmPanel.hidden = false;
  filmStatus.textContent = 'Starting the concept film. If your browser pauses playback, use Play in the player. If it is unavailable, use the YouTube link below.';
  filmPanel.focus();
});
document.getElementById('concept-video-close')?.addEventListener('click', () => {
  filmMount.replaceChildren();
  filmPanel.hidden = true;
  filmPoster.hidden = false;
  filmPoster.setAttribute('aria-expanded', 'false');
  filmStatus.textContent = 'Video player closed.';
  filmPoster.focus();
});
