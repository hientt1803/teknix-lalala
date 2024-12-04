import AgentCard from './agent-card';

export type Agent = {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
  desc: string;
};

export const mockAgent: Agent[] = [
  {
    id: 1,
    name: 'Cody Fisher',
    position: 'Founder and Principal Broker',
    imageUrl:
      'https://travila-nextjs.vercel.app/assets/imgs/page/pages/team6.png',
    desc: 'With over 15 years of real estate experience, John leads the Travila team with passion and expertise. His commitment to client satisfaction and market knowledge sets the standard for our exceptional service.',
  },
  {
    id: 2,
    name: 'Darrell Steward',
    position: 'Founder and Principal Broker',
    imageUrl:
      'https://travila-nextjs.vercel.app/assets/imgs/page/pages/team.png',
    desc: 'With over 15 years of real estate experience, John leads the Travila team with passion and expertise. His commitment to client satisfaction and market knowledge sets the standard for our exceptional service.',
  },
  {
    id: 3,
    name: 'Ronald Richards',
    position: 'Founder and Principal Broker',
    imageUrl: 'https://travila-nextjs.vercel.app/assets/imgs/page/pages/team2',
    desc: 'With over 15 years of real estate experience, John leads the Travila team with passion and expertise. His commitment to client satisfaction and market knowledge sets the standard for our exceptional service.',
  },
  {
    id: 4,
    name: 'Jerome Bell',
    position: 'Founder and Principal Broker',
    imageUrl:
      'https://travila-nextjs.vercel.app/assets/imgs/page/pages/team3.png',
    desc: 'With over 15 years of real estate experience, John leads the Travila team with passion and expertise. His commitment to client satisfaction and market knowledge sets the standard for our exceptional service.',
  },
  {
    id: 5,
    name: 'Jenny Wilson',
    position: 'Founder and Principal Broker',
    imageUrl:
      'https://travila-nextjs.vercel.app/assets/imgs/page/pages/team4.png',
    desc: 'With over 15 years of real estate experience, John leads the Travila team with passion and expertise. His commitment to client satisfaction and market knowledge sets the standard for our exceptional service.',
  },
  {
    id: 6,
    name: 'Floyd Miles',
    position: 'Founder and Principal Broker',
    imageUrl:
      'https://travila-nextjs.vercel.app/assets/imgs/page/pages/team5.png',
    desc: 'With over 15 years of real estate experience, John leads the Travila team with passion and expertise. His commitment to client satisfaction and market knowledge sets the standard for our exceptional service.',
  },
];

export const ListAgents = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-3 md:gap-8">
      {mockAgent.map((agent, index) => (
        <AgentCard {...agent} key={index} />
      ))}
    </div>
  );
};
