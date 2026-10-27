---
title: Using React
description: Tailwind Plus UI Blocks in React — Headless UI and Heroicons dependencies, and how to adapt the single-component examples.
source: https://tailwindcss.com/plus/ui-blocks/documentation/using-react
---

# Using React

## Installing dependencies

Tailwind Plus for React depends on [Headless UI](https://headlessui.dev) to power all of the interactive behavior and [Heroicons](https://heroicons.com) for icons, so you'll need to add these two libraries to your project:

```bash
npm install @headlessui/react @heroicons/react
```

**These libraries and Tailwind Plus itself all require React >= 18**.

## Creating components

All React examples are provided as a simple single component and make no assumptions about how you want to break things down, what prop APIs you want to expose, or where you get any data from.

Some data has been extracted into basic local variables just to clean up duplication and make the code easier to read and understand, but we've tried to do as little as possible to avoid enforcing any unnecessarily rigid opinions.

When you're adapting code from Tailwind Plus for your own projects, you should break the examples down into smaller components as necessary to achieve whatever level of reuse you need for your project.

For example, you might start with this stacked list component:

```jsx
const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export default function Example() {
  return (
    <ul className="divide-y divide-gray-200">
      {people.map((person) => (
        <li key={person.email} className="flex py-4">
          <img className="size-10 rounded-full" src={person.image} alt="" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{person.name}</p>
            <p className="text-sm text-gray-500">{person.email}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
```

After adapting the content for your own project, breaking it down into separate components, and wiring up your data source, it might look more like this:

```jsx
function HockeyTeamItem({ team }) {
  return (
    <li className="flex py-4">
      <img className="size-10 rounded-full" src={team.logo} alt="" />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{team.name}</p>
        <p className="text-sm text-gray-500">{team.city}</p>
      </div>
    </li>
  )
}

export default function HockeyTeamList({ teams }) {
  return (
    <ul className="divide-y divide-gray-200">
      {teams.map((team) => (
        <HockeyTeamItem key={team.id} team={team} />
      ))}
    </ul>
  )
}
```

Tailwind Plus is more like a set of blueprints, patterns, and ideas than a rigid UI kit. The code you end up with at the end of the day is _yours_, and you can factor it however you like.
