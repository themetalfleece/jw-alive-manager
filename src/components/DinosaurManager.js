import React, { Component } from 'react';
import './DinosaurManager.css';
import NumInput from './NumInput';
import NameInput from './NameInput';
import TickInput from './TickInput';

// TODO use the dino names and rarities from the json file
import dinosData from '../res/dinos.json';
const rarities = ['Common', 'Rare', 'Epic', 'Legendary', 'Unique'];

// the factor for the level up stats change
const factor = 1.05;

class DinosaurManager extends Component {

    constructor() {
        super();

        this.state = {
            dinosaurs: []
        }

        const storageDinos = loadDinosaursFromStorage();
        if (storageDinos) {
            this.state.dinosaurs = storageDinos;
        }

    }

    inputChanged = (type, index, event) => {

        const dinosaurs = [...this.state.dinosaurs];
        const dinosaur = { ...dinosaurs[index] };

        const value = event.target.value;

        // if they change the level while the dino is locked, calculate the health & damage again
        if (type === 'level' && dinosaur.locked) {

            const newLevel = parseInt(value, 10);

            dinosaur.damage = currentToNewLevel(dinosaur.damage, dinosaur.level, newLevel);

            dinosaur.health = currentToNewLevel(dinosaur.health, dinosaur.level, newLevel);
        }

        if (typeof dinosaur[type] === 'number') {
            dinosaur[type] = parseInt(value, 10);
        } else if (type === 'isInTeam') {
            dinosaur[type] = !!event.target.checked;
        } else {
            dinosaur[type] = value;
        }

        dinosaurs[index] = dinosaur;

        this.setState({
            dinosaurs: dinosaurs
        }, () => { saveStateToStorage(this.state) });

    }

    newDino = () => {
        this.setState({
            dinosaurs: this.state.dinosaurs.concat({
                name: '',
                locked: false,
                isInTeam: false,
                speed: 0,
                criticalChance: 0,
                armor: 0,
                currentHealth: 0,
                level: 0,
                health: 0,
                damage: 0,
                active: true,
                rarity: ''
            })
        })
    }

    toggleLock = index => {

        const dinosaurs = [...this.state.dinosaurs];
        const dinosaur = { ...dinosaurs[index] };

        dinosaur.locked = !dinosaur.locked;

        dinosaurs[index] = dinosaur;

        this.setState({
            dinosaurs: dinosaurs
        }, () => { saveStateToStorage(this.state) });

    }

    sortBy = (field, direction) => {

        const dinosaurs = [...this.state.dinosaurs];

        dinosaurs.sort((a, b) => {

            // inactive should be last
            if (!b.active && a.active) return -1;
            if (!a.active && b.active) return 1;

            if (direction === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }

        });

        this.setState({
            dinosaurs: dinosaurs
        }, () => { saveStateToStorage(this.state) });

    }

    toggleDinoActive = index => {

        const dinosaurs = [...this.state.dinosaurs];
        const dinosaur = { ...dinosaurs[index] };

        dinosaur.active = !dinosaur.active;

        dinosaurs[index] = dinosaur;

        this.setState({
            dinosaurs: dinosaurs
        }, () => { saveStateToStorage(this.state) });

    }

    render() {

        const dinosaurRows = this.state.dinosaurs.map((dinosaur, index) => {
            return (
                <tr className='dinosaur-row' key={index}>

                    <td>
                        <NameInput
                            value={dinosaur.name}
                            onChange={event => this.inputChanged('name', index, event)}
                            locked={dinosaur.locked}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <TickInput
                            checked={dinosaur.isInTeam}
                            onChange={event => this.inputChanged('isInTeam', index, event)}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <NumInput
                            value={dinosaur.level}
                            onChange={event => this.inputChanged('level', index, event)}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <NameInput
                            value={dinosaur.rarity}
                            onChange={event => this.inputChanged('rarity', index, event)}
                            locked={dinosaur.locked}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <NumInput
                            value={dinosaur.health}
                            onChange={event => this.inputChanged('health', index, event)}
                            locked={dinosaur.locked}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <NumInput
                            value={dinosaur.damage}
                            onChange={event => this.inputChanged('damage', index, event)}
                            locked={dinosaur.locked}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <NumInput
                            value={dinosaur.speed}
                            onChange={event => this.inputChanged('speed', index, event)}
                            locked={dinosaur.locked}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <NumInput
                            value={dinosaur.criticalChance}
                            onChange={event => this.inputChanged('criticalChance', index, event)}
                            locked={dinosaur.locked}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td>
                        <NumInput
                            value={dinosaur.armor}
                            onChange={event => this.inputChanged('armor', index, event)}
                            locked={dinosaur.locked}
                            disabled={!dinosaur.active}
                        />
                    </td>

                    <td className='lock'
                        onClick={() => this.toggleLock(index)}
                    >
                        {dinosaur.locked ? 'unlock' : 'lock'}
                    </td>

                    <td className='remove'
                        onClick={() => this.toggleDinoActive(index)}
                    >
                        {dinosaur.active ? 'deactivate' : 'activate'}
                    </td>
                </tr>
            )
        });

        const dinosaurTable = (
            <div id='tableContainer' className='table-responsive-md'>
                <table id='dinosaur-table' className='table'>
                    <thead>
                        <tr>

                            <th
                                scope='col'
                                className='nameInputHeader'
                                onClick={() => this.sortBy('name', 'asc')}
                            >
                                Name
                            </th>

                            <th
                                scope='col'
                                className='nameInputHeader'
                                onClick={() => this.sortBy('isInTeam', 'desc')}
                            >
                                In Team
                            </th>


                            <th
                                scope='col'
                                className='numInputHeader'
                                onClick={() => this.sortBy('level', 'desc')}
                            >
                                Level
                            </th>

                            <th
                                scope='col'
                                className='nameInputHeader'
                            >
                                Rarity
                            </th>

                            <th
                                scope='col'
                                className='numInputHeader'
                                onClick={() => this.sortBy('health', 'desc')}
                            >
                                Health
                            </th>

                            <th
                                scope='col'
                                className='numInputHeader'
                                onClick={() => this.sortBy('damage', 'desc')}
                            >
                                Damage
                            </th>

                            <th
                                scope='col'
                                className='numInputHeader'
                                onClick={() => this.sortBy('speed', 'desc')}
                            >
                                Speed
                            </th>

                            <th
                                scope='col'
                                className='numInputHeader'
                                onClick={() => this.sortBy('criticalChance', 'desc')}
                            >
                                Critical Chance
                            </th>

                            <th
                                scope='col'
                                className='numInputHeader'
                                onClick={() => this.sortBy('armor', 'desc')}
                            >
                                Armor
                            </th>

                            <th scope='col' className='miscInputHeader'>Lock Stats</th>

                            <th scope='col' className='miscInputHeader'>Active</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dinosaurRows}
                    </tbody>
                </table>
            </div>
        );

        return (
            <div className='DinosaurManager'>

                <div className='description'>
                    Take a moment to enable the dinosaurs who already own. To change a dino's stat, press 'unlock' and enter the stats who see on your screen. Then lock it. Now, whenever you change its level, the stats will be automatically calculated (only the health and damage change). <br />
                    You can click on the column names to sort by them. The inactive ones will always be on the bottom.
                </div>

                {dinosaurTable}

                <div className='button-container'>
                    <button
                        id='newDino'
                        type='button'
                        className='btn btn-primary'
                        onClick={this.newDino}
                    >
                        New
                    </button>
                </div>

            </div>
        );
    }
}

function currentToNewLevel(stat, currentLevel, targetLevel) {

    if (currentLevel === targetLevel) return stat;

    let nextLevel;

    if (currentLevel < targetLevel) {
        stat = Math.round(stat * factor);
        nextLevel = currentLevel + 1;
    } else {
        stat = Math.round(stat / factor);
        nextLevel = currentLevel - 1;
    }

    return currentToNewLevel(stat, nextLevel, targetLevel)

}

function saveStateToStorage(state) {
    // Check browser support
    if (typeof (Storage) !== 'undefined') {
        // Store
        localStorage.setItem('dinosaurs', JSON.stringify(state.dinosaurs));
    }
}

function loadDinosaursFromStorage() {
    // Check browser support
    if (typeof (Storage) !== 'undefined') {
        // Retrieve
        return JSON.parse(localStorage.getItem('dinosaurs'));
    }
}

export default DinosaurManager;
