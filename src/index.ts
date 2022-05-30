import PV from "./parlezvous"

export * from "./utils"

export const ParlezVous = new PV()
export const phrase = ParlezVous.phrase.bind(ParlezVous)
