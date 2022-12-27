export const FRAME_OPTIONS = [
  {
    price: 10,
    id: '63a289d6254801fa71e3f309',
    name: '55" OLED',
    slug: '55-inch-oled',
  },
  {
    id: '63a289dd254801fa71e3f30a',
    name: '44" 4K',
    slug: '44-inch-4k',
    price: 5,
    // id: '43-inch-4k',
    // name: '43” 4K Display',
    // price: 0.0001,
    // img: '',
  },
];

declare global {
  interface IHardwareInfo {
    subtitle: string;
    title: string;
    icon: string;
  }

  interface IHardwareItem {
    subtitle: string;
    title: string;
    desc: string;
    options: IHardwareInfo[];
  }
}

export const HARDWARE_CONTENTS: IHardwareItem[] = [
  {
    subtitle: 'The monitor',
    title: 'Immersive 55-inch OLED',
    desc: 'A big, beautiful window into new worlds, Generative Display draws you in from the moment you turn it on. Spectacularly detailed generative art springs to life.',
    options: [
      {
        subtitle: 'LCD Display',
        title: `55” Oled & 43” LCD`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-053ce2eba7cd.svg',
      },
      {
        subtitle: 'Display Resolution',
        title: `4K`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-020cbdfb7164.svg',
      },
      {
        subtitle: 'Peak Brightness',
        title: `800 Nits`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-09_1d77cb3db62.svg',
      },
      {
        subtitle: 'Contrast Ratio',
        title: `1200:1`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-08a5c957d2c1.svg',
      },
    ],
  },
  {
    subtitle: 'GPU',
    title: 'Powerful GPU.',
    desc: 'NVIDIA Ampere Streaming multiprocessor - the most efficient GPU in the world - delivers 2X the throughput of FP32 and improves power efficiency. It also features 2nd Gen RT Cores and 3rd Gen Tensor Cores to push performance to unparalleled levels.',
    options: [
      {
        subtitle: 'CUDA Cores',
        title: `3584`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-045afcab15df.svg',
      },
      {
        subtitle: 'Boost Clock',
        title: `1.78 GHz`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-03cab2ac2113.svg',
      },
      {
        subtitle: 'Memory Size',
        title: `12GB`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-0612014bd386.svg',
      },
      {
        subtitle: 'Memory Type',
        title: `GDDR6`,
        icon: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20221222/Icon_set-01d5dae117da.svg',
      },
    ],
  },
];
